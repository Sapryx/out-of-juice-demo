const nulls = {
    /**
     * @template T
     * @param {() => T} getter
     * @param {T} fallback
     * @returns {T}
     */
    getOr(getter, fallback) {
        const value = getter();
        return value === undefined ? fallback : value;
    }
}
