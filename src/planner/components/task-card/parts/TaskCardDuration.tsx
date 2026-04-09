import { useTaskCardContext } from "./TaskCardContext";

interface TaskCardDurationProps {
	duration?: number;
}

export const TaskCardDuration = ({ duration }: TaskCardDurationProps) => {
	useTaskCardContext();

	if (!duration) {
		return null;
	}

	return <p className="text-xs text-white">({duration} mins)</p>;
};

