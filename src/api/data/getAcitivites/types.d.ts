type GetActivitiesQuery = {
  date: DateTime;
};

type Activity = {
  id: string;
  type: string;
  resource: {
    type: string;
    id: string;
  };
  title: string;
  description: string;
  primaryAmount: string;
  secondaryAmount: string;
  status: string;
  createdOn: string;
  updatedOn: string;
};

type GetActivitiesResponse = {
  cursor: string;
  activities: Activity[];
};
