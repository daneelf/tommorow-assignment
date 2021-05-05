
export const getUpdatedDraggedItems = (columnsData, source, destination) => {
    const sourceColumn = columnsData[source.droppableId];
    const destinationColumn = columnsData[destination.droppableId];
    let afterDropData = {};
    let beforeDropData = {};

    if (!sourceColumn || !destinationColumn) {
        return columnsData;
    }

    const [removedItem] = sourceColumn.taskList.splice(source.index, 1);
    beforeDropData = {
        ...columnsData,
        [source.droppableId]: sourceColumn
    }

    destinationColumn.taskList.splice(destination.index, 0, removedItem);

    afterDropData = {
        ...columnsData,
        [destination.droppableId]: destinationColumn,
    }

    return {
        beforeDropData,
        afterDropData
    }
}