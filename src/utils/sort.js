export const sortTaskList = (columnsData, columnId, sortBy) => {
  const selectedColumn = columnsData[columnId];
  const taskList = selectedColumn.taskList;
  let sortedTaskList = [];

  if (sortBy === "highest_priority") {
    sortedTaskList = [...taskList].sort(
      (taskA, taskB) => taskA["priority"] - taskB["priority"]
    );
  } else if (sortBy === "lowest_priority") {
    sortedTaskList = [...taskList].sort(
      (taskA, taskB) => taskB["priority"] - taskA["priority"]
    );
  }

  return sortedTaskList;
};



export const reorder = (list, startIndex, endIndex) => {
    const result = list.taskList;
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };