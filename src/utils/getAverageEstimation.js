const getArrayOfEstimations = (taskList) => {
  let estiamtionsArray = [];
  if (taskList && taskList.length > 0) {
    taskList.forEach((task) => {
      const estimationTime = Object.values(task.timeEstimation).toString().replace(',','.');
      estiamtionsArray.push(Number(estimationTime));
    });
    return estiamtionsArray;
  }
};

export const getAverageEstimation = (taskList) => {
  const estimationsArray = getArrayOfEstimations(taskList);
  if (taskList && taskList.length > 0) {
    const average =
      estimationsArray.reduce(function (sum, value) {
        return Number(sum) + Number(value);
      }, 0) / estimationsArray.length;
    return parseFloat(average).toFixed(2);
  }
  return 0.0;
};
