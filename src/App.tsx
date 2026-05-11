
import { useState } from 'react';
import { DragDropProvider } from '@dnd-kit/react';

import { BackgroundPreview, ErrorBoundary, TodoColumn, useToast } from '@planner/components';
import { dayColumns } from '@planner/config';
import { useMomentDay, usePlannedTask } from '@planner/hooks';
import type { Day, MomentDay } from '@planner/models';
import { ConfirmationModalContent, EditTaskModalContent, Modal } from '@planner/components/shared/modal';

import './App.css'
import { backgroundByMoment } from '@planner/helpers/planner';
import { DayColumn } from './planner/components/day';

function App() {
  const momentDay = useMomentDay();
  const [previewMomentDay, setPreviewMomentDay] = useState<MomentDay | null>(null);

  const {
    plannedTasks,
    createPlannedTask,
    addTask: addPlannedTask,
    moveTask: movePlannedTask,
  } = usePlannedTask();

  const { show } = useToast();

  const activeMomentDay = previewMomentDay ?? momentDay;
  const appBackground = `linear-gradient(rgba(2, 6, 23, 0.28), rgba(2, 6, 23, 0.35)), ${backgroundByMoment[activeMomentDay]}`;
  const greeting = `Good ${activeMomentDay}`;

  const handleDragEnd = (sourceId: string, targetId?: string) => {
    if (!targetId || !dayColumns.some((column) => column.id === targetId)) {
      return;
    }

    const sourcePlanned = plannedTasks.find((t) => t.id === sourceId);

    if (sourcePlanned) {
      if (sourcePlanned.day !== targetId) {
        movePlannedTask(sourcePlanned.id, targetId as Day);
        show("Task moved successfully", "success", { duration: 2000 });
      }
      return;
    }

    addPlannedTask(createPlannedTask(sourceId, targetId as Day));
    show("Task added successfully", "success", { duration: 2000 });
  };


  return (
    <ErrorBoundary>
      <Modal.Root>
        <div className="min-h-screen p-4 transition-all duration-700" style={{ backgroundImage: appBackground }}>
          <BackgroundPreview previewMomentDay={previewMomentDay} setPreviewMomentDay={setPreviewMomentDay} />
          <h1 className="text-2xl md:text-4xl font-bold mb-4 text-left">{greeting}</h1>
          <DragDropProvider
            onDragStart={() => {
              window.dispatchEvent(new Event("planner:drag-start"));
            }}
            onDragEnd={(event) => {
              const { operation } = event;
              const { source, target } = operation;
              if (!source) {
                return;
              }
              handleDragEnd(source.id as string, target?.id as string | undefined);
            }}
          >
            <div className="flex flex-col lg:flex-row gap-4 items-start">
              <div className="w-full lg:w-72 lg:shrink-0">
                <TodoColumn />
              </div>

              <div className="board-scroll w-full lg:flex-1 lg:overflow-x-auto lg:pb-2">
                <div className="flex flex-col lg:flex-row gap-4 items-start lg:min-w-max">
                  {dayColumns.map((column) => (
                    <DayColumn key={column.id} day={column.id} />
                  ))}
                </div>
              </div>
            </div>
          </DragDropProvider>
        </div>
        <Modal.Content>
          <EditTaskModalContent />
          <ConfirmationModalContent />
        </Modal.Content>
      </Modal.Root>
    </ErrorBoundary>
  )
}

export default App;
