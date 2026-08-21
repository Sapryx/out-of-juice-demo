const list = {
    shuffle(list) {
        for(let i = list.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = list[i];
            list[i] = list[j];
            list[j] = temp;
        }

        return list;
    },

    /**
     * @param {Array<Object>} list
     * @param {Object} item
     */
    remove(list, item) {
        const index = list.indexOf(item);
        list.splice(index, 1);
    }
};
