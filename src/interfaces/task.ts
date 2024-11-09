import { Id } from "../../convex/_generated/dataModel";

export interface Task {
  _id: Id<"tasks">;
  text: string;
  isCompleted: boolean;
  _creationTime: Date;
}