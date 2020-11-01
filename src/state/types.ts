// Type definitions for the state implementation

// Type of the Add Color action
export type AddColorAction = {
    type: 'ADD_COLOR';
    title: string;
    color: string;
    rating: number;
};

// Type of the Rate Color action
export type RateColorAction = {
    type: 'RATE_COLOR';
    id: string;
    rating: number;
};

// Type of the Delete Color action
export type DeleteColorAction = {
    type: 'DELETE_COLOR';
    id: string;
};

// Union type of all Color actions
export type ColorActions = AddColorAction | RateColorAction | DeleteColorAction;
