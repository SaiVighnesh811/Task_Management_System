import React, { useEffect, useState } from 'react';
import useTaskStore from '../store/useTaskStore';
import { Plus } from 'lucide-react';
import TaskModal from '../components/TaskModal';
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  KeyboardSensor,
  closestCenter,
  useDraggable,
  useDroppable,
} from '@dnd-kit/core';

// Draggable Task Card
function TaskCard({ task }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: task._id,
    data: { task },
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    zIndex: isDragging ? 50 : 1,
    opacity: isDragging ? 0.8 : 1,
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`bg-white dark:bg-dark-card p-4 rounded-xl shadow-sm border border-gray-200 dark:border-dark-border hover:shadow-md transition-shadow active:cursor-grabbing cursor-grab ${isDragging ? 'ring-2 ring-primary-500 shadow-xl' : ''}`}
    >
      <div className="flex justify-between items-start mb-2 pointer-events-none">
        <h3 className="font-medium text-gray-900 dark:text-white line-clamp-2">{task.title}</h3>
        <span className={`text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider ml-2 shrink-0
          ${task.priority === 'high' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
            task.priority === 'medium' ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400' :
            'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
          }
        `}>
          {task.priority}
        </span>
      </div>
      {task.description && <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 pointer-events-none">{task.description}</p>}
    </div>
  );
}

// Droppable Column
function Column({ id, title, tasks }) {
  const { setNodeRef, isOver } = useDroppable({
    id: id,
  });

  return (
    <div 
      className={`glass-card flex flex-col rounded-3xl bg-gray-100/50 p-5 transition-colors duration-300 ${isOver ? 'bg-primary-50 dark:bg-primary-900/20 border-primary-300 dark:border-primary-700' : ''}`}
    >
      <h2 className="font-bold text-lg text-gray-700 dark:text-gray-200 mb-4 flex items-center gap-2">
        {title} 
        <span className="text-sm font-medium bg-gray-200 dark:bg-gray-800 px-2 py-0.5 rounded-full text-gray-600 dark:text-gray-300">
          {tasks.length}
        </span>
      </h2>
      <div 
        ref={setNodeRef}
        className="flex-1 overflow-y-auto space-y-3 p-1 min-h-[150px]"
      >
        {tasks.map(task => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>
    </div>
  );
}


const Dashboard = () => {
  const { tasks, fetchTasks, isLoading, updateTaskStatus } = useTaskStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const columns = [
    { id: 'todo', title: 'To Do 📌' },
    { id: 'in-progress', title: 'In Progress ⏳' },
    { id: 'completed', title: 'Completed ✅' }
  ];

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor)
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id;
    const currentStatus = active.data.current?.task?.status;
    const newStatus = over.id;

    if (currentStatus !== newStatus) {
      updateTaskStatus(taskId, newStatus);
    }
  };

  return (
    <div className="h-full flex flex-col relative">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-gray-900 dark:text-white">Task Board</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your work efficiently.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="btn-primary"
        >
          <Plus size={20} />
          <span className="hidden sm:inline">New Task</span>
        </button>
      </div>

      {isLoading && tasks.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
        </div>
      ) : (
        <DndContext 
          sensors={sensors} 
          collisionDetection={closestCenter} 
          onDragEnd={handleDragEnd}
        >
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 overflow-hidden h-full">
            {columns.map(col => {
              const colTasks = tasks.filter(t => t.status === col.id);
              return <Column key={col.id} id={col.id} title={col.title} tasks={colTasks} />;
            })}
          </div>
        </DndContext>
      )}

      <TaskModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Dashboard;
