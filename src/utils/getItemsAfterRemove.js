
export const getListAfterRemove = (list, id) => {
    return list.filter((item) => {
        return item.id !== Number(id);
    });
}
