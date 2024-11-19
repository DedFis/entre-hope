'use server'

import { revalidatePath } from 'next/cache'

import { connectToDatabase } from '@/lib/database'
import Campaign, { ICampaign } from '@/lib/database/models/campaign.model'
import User from '@/lib/database/models/user.model'
import { handleError } from '@/lib/utils'

import {
  CreateCampaignParams,
  UpdateCampaignParams,
  DeleteCampaignParams,
  GetAllCampaignsParams,
  GetCampaignsByUserParams,
  GetRelatedCampaignsByCategoryParams,
} from '@/types'
import { getUserByClerkId } from './user.actions'

const populateCampaign = (query: any) => {
  return query
    .populate({ path: 'owner', model: User, select: 'username' })
    // .populate({ path: 'category', model: Category, select: '_id name' })
}

// owner: { type: Schema.Types.ObjectId, ref: 'User' }, // Reference to the User model
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   target: { type: Number, required: true },
//   deadline: { type: Date, required: true },
//   amountCollected: { type: Number, default: 0 },
//   image: { type: String, required: true },
//   donators: [{ type: Schema.Types.ObjectId, ref: 'User' }], // References to Users
//   donations: [{ type: Number }], // Corresponding donation amounts

// CREATE
export async function createCampaign({ userId, campaign, path }: CreateCampaignParams) {
  try {
    await connectToDatabase()

    const owner = await getUserByClerkId(userId);

    if (!owner) throw new Error('Owner not found')

    const campaignValue = {
      owner: owner._id,
      title: campaign.title,
      description: campaign.description,
      target: campaign.target,
      deadline: campaign.deadline,
      amountCollected: 0,
      image: campaign.image,
      donators: [],
      donations: []
    }

    console.log(campaignValue)
    
    const newCampaign = await Campaign.create(campaignValue)
    // await newCampaign.save();

    console.log(newCampaign)
    
    revalidatePath(path)

    return JSON.parse(JSON.stringify(newCampaign))
  } catch (error) {
    // handleError(error)
  }
}

// GET ONE EVENT BY ID
export async function getCampaignById(campaignId: string) {
  try {
    await connectToDatabase()

    const campaign = await populateCampaign(Campaign.findById(campaignId))

    if (!campaign) throw new Error('Campaign not found')

    return JSON.parse(JSON.stringify(campaign))
  } catch (error) {
    handleError(error)
  }
}

// DONATE TO CAMPAIGN
export async function addDonation(campaignId: string, userId: string, ammount: number) {
    try {
        await connectToDatabase()

        const campaign = await populateCampaign(Campaign.findById(campaignId))

        if (!campaign) throw new Error('Campaign not found')

        campaign.donators.push(userId);
        campaign.donations.push(ammount);
        campaign.ammountCollected += ammount;

        await campaign.save()
    } catch (error) {
        handleError(error)
    }
}

// UPDATE
export async function updateEvent({ userId, campaign, path }: UpdateCampaignParams) {
  try {
    await connectToDatabase()

    const eventToUpdate = await Campaign.findById(campaign._id)
    if (!eventToUpdate || eventToUpdate.organizer.toHexString() !== userId) {
      throw new Error('Unauthorized or campaign not found')
    }

    const updatedEvent = await Campaign.findByIdAndUpdate(
      campaign._id,
      { ...campaign },
      { new: true }
    )
    revalidatePath(path)

    return JSON.parse(JSON.stringify(updatedEvent))
  } catch (error) {
    handleError(error)
  }
}

// DELETE
export async function deleteEvent({ campaignId, path }: DeleteCampaignParams) {
  try {
    await connectToDatabase()

    const deletedCampaign = await Campaign.findByIdAndDelete(campaignId)
    if (deletedCampaign) revalidatePath(path)
  } catch (error) {
    handleError(error)
  }
}

// GET ALL EVENTS
export async function getAllCampaigns({ query, limit = 0, page }: GetAllCampaignsParams) {
  try {
    await connectToDatabase()

    const titleCondition = query ? { title: { $regex: query, $options: 'i' } } : {}
    const conditions = {
      $and: [titleCondition],
    }

    const skipAmount = (Number(page) - 1) * limit
    const campaignsQuery = Campaign.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)

    const campaigns = await populateCampaign(campaignsQuery)
    const campaignsCount = await Campaign.countDocuments(conditions)

    return {
      data: JSON.parse(JSON.stringify(campaigns)),
      totalPages: Math.ceil(campaignsCount / limit),
    }
  } catch (error) {
    handleError(error)
  }
}

// GET EVENTS BY ORGANIZER
export async function getCampaignsByUser({ userId, limit = 6, page }: GetCampaignsByUserParams) {
  try {
    await connectToDatabase()

    const conditions = { organizer: userId }
    const skipAmount = (page - 1) * limit

    const campaignsQuery = Campaign.find(conditions)
      .sort({ createdAt: 'desc' })
      .skip(skipAmount)
      .limit(limit)

    const campaigns = await populateCampaign(campaignsQuery)
    const campaignsCount = await Campaign.countDocuments(conditions)

    return { data: JSON.parse(JSON.stringify(campaigns)), totalPages: Math.ceil(campaignsCount / limit) }
  } catch (error) {
    handleError(error)
  }
}

// GET RELATED EVENTS: EVENTS WITH SAME CATEGORY
// export async function getRelatedEventsByCategory({
//   categoryId,
//   eventId,
//   limit = 3,
//   page = 1,
// }: GetRelatedEventsByCategoryParams) {
//   try {
//     await connectToDatabase()

//     const skipAmount = (Number(page) - 1) * limit
//     const conditions = { $and: [{ category: categoryId }, { _id: { $ne: eventId } }] }

//     const eventsQuery = Event.find(conditions)
//       .sort({ createdAt: 'desc' })
//       .skip(skipAmount)
//       .limit(limit)

//     const events = await populateEvent(eventsQuery)
//     const eventsCount = await Event.countDocuments(conditions)

//     return { data: JSON.parse(JSON.stringify(events)), totalPages: Math.ceil(eventsCount / limit) }
//   } catch (error) {
//     handleError(error)
//   }
// }
