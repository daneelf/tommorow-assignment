
export const updateReorderColumns = (columnsData, id, newTaskList) => {
    columnsData[id] = {
        ...columnsData[id],
        taskList: newTaskList
    }

    return columnsData;
}