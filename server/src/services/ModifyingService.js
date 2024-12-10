class ModifyingService {
    static mapFields(data, mapping) {
        return data.map(item => {
            let mappedItem = {};
            for (let [sourceField, targetField] of Object.entries(mapping)) {
                mappedItem[targetField] = item[sourceField];
            }
            return mappedItem;
        });
    }

    static filterData(data, filter) {
        return data.filter(item => {
            for (let [field, condition] of Object.entries(filter)) {
                if (!condition(item[field])) {
                    return false;
                }
            }
            return true;
        });
    }

    static convertDateFormat(dateString) {
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`;
    }

    static convertDates(data, dateField) {
        return data.map(item => {
            if (item[dateField]) {
                item[dateField] = this.convertDateFormat(item[dateField]);
            }
            return item;
        });
    }
}

module.exports = new ModifyingService();