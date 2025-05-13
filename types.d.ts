// types.ts
export type Dream = {
  id: string;
  title: string;
  mood: string;
  description: string;
  created_at: string;
};

export type RootStackParamList = {
  Journal: undefined;
  "New Dream": undefined;
  DreamDetail: { dream: Dream };
  Insights: undefined;
};
