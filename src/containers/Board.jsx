import React from "react";
import Header from "../views/Header";
import Column from "../views/Column";
import { Container } from "@material-ui/core";
import { DragDropContext } from "react-beautiful-dnd";
import { getUpdatedDraggedItems } from "../utils/getUpdatedDraggedItems";
import { updateReorderColumns } from "../utils/updatedReorderColumns";
import { ColumnsContainer } from "./BoardStyles";
import { useColumnsData } from "../context/LocalContext";
import {generateId} from "../utils/generateId";
import {reorder} from "../utils/sort";

const Board = () => {
  const [columnsData, setColumnsData] = useColumnsData();

  const handledAddColumn = () => {
    const columns = { ...columnsData };
    const newColumn = {
      id: generateId(),
      title: "Column Title",
      canBeDeleted: false,
      taskList: [],
    };

    columns[newColumn?.id] = newColumn;
    setColumnsData(columns);
  };

  const handleRemoveColumn = (id) => {
    const columns = {...columnsData}
    delete columns[id]
    setColumnsData(columns)
  };

  const handleUpdateColumn = (columnItem) => {
    const updatedColumns = [...columnsData, columnItem];
    setColumnsData(updatedColumns);
  };


  const onDragEnd = (event) => {
    const { source, destination } = event;
    const columns = { ...columnsData };
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      if (sourceColumn) {
        const taskList = reorder(sourceColumn, source.index, destination.index);
        const updatedReorderColumns = updateReorderColumns(
          columns,
          Number(source.droppableId),
          taskList
        );
        setColumnsData(updatedReorderColumns);
      }
    } else {
      const updatedDraggedItems = getUpdatedDraggedItems(
        columns,
        source,
        destination
      );
      if (updatedDraggedItems) {
        setColumnsData(updatedDraggedItems.afterDropData);
      }
    }
  };

  return (
    <>
      <Header
        handledAddColumn={handledAddColumn}
        handleClearBoard={() => setColumnsData({})}
      />

      <DragDropContext onDragEnd={onDragEnd}>
        <Container style={{ maxWidth: "100%", overflowY: "auto" }}>
          <ColumnsContainer
            display="flex"
            flexDirection="row"
            mt={10}
            p="10px"
            id="test-container"
          >
            {columnsData &&
              Object.keys(columnsData).map((key) => {
                const column = columnsData[Number(key)];
                return (
                  <Column
                    key={column?.id}
                    column={column}
                    handleRemoveColumn={() => handleRemoveColumn(column?.id)}
                    handleUpdateColumn={handleUpdateColumn}
                  />
                );
              })}
          
          </ColumnsContainer>
        </Container>
      </DragDropContext>
    </>
  );
};

export default Board;
