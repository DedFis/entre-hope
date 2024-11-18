// ====== USER PARAMS
export type CreateUserParams = {
    clerkId: string
    firstName: string
    lastName: string
    username: string
    email: string
    photo: string
  }
  
  export type UpdateUserParams = {
    firstName: string
    lastName: string
    username: string
    photo: string
  }

  // ====== EVENT PARAMS
  export type CreateCampaignParams = {
    userId: string
    campaign: {
        _id: string
        owner: string
        title: string
        description: string
        target: number
        deadline: Date
        image: string
    }
    path: string
  }
  
  export type UpdateCampaignParams = {
    userId: string
    campaign: {
      _id: string
      owner: string
      title: string
      description: string
      target: number
      deadline: Date
      ammountCollected: number
      image: string
      donatorId: string
      donations: number
    }
    path: string
  }
  
  export type DeleteCampaignParams = {
    campaignId: string
    path: string
  }
  
  export type GetAllCampaignsParams = {
    query: string
    category: string
    limit: number
    page: number
  }
  
  export type GetCampaignsByUserParams = {
    userId: string
    limit?: number
    page: number
  }
  
  export type GetRelatedCampaignsByCategoryParams = {
    categoryId: string
    campaignId: string
    limit?: number
    page: number | string
  }
  
  //   _id: string;
//     owner: string; // Reference to User model's _id
//     title: string;
//     description: string;
//     target: number;
//     deadline: Date;
//     amountCollected: number;
//     image: string;
//     donators: { _id: string, name: string }[]; // Array of User references
//     donations: number[]; // Donation amounts

  export type Campaign = {
    _id: string
    owner: string
    title: string
    description: string
    target: number
    deadline: Date
    ammountCollected: number
    endDateTime: Date
    image: string
    donator: {
      _id: string
      firstName: string
      lastName: string
    }
    donations: {
      ammount: number
    }
  }
  
  // ====== CATEGORY PARAMS
  export type CreateCategoryParams = {
    categoryName: string
  }
  
  // ====== ORDER PARAMS
  export type CheckoutOrderParams = {
    eventTitle: string
    eventId: string
    price: string
    isFree: boolean
    buyerId: string
  }
  
  export type CreateOrderParams = {
    stripeId: string
    eventId: string
    buyerId: string
    totalAmount: string
    createdAt: Date
  }
  
  export type GetOrdersByEventParams = {
    eventId: string
    searchString: string
  }
  
  export type GetOrdersByUserParams = {
    userId: string | null
    limit?: number
    page: string | number | null
  }
  
  // ====== URL QUERY PARAMS
  export type UrlQueryParams = {
    params: string
    key: string
    value: string | null
  }
  
  export type RemoveUrlQueryParams = {
    params: string
    keysToRemove: string[]
  }
  
  export type SearchParamProps = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
  }
  