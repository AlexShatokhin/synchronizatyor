class ModifyingService {
    mapFields(data, mapping) {
        const replaceKeys = (obj, mapping) => {
            if (Array.isArray(obj)) {
                return obj.map(item => replaceKeys(item, mapping));
            } else if (typeof obj === 'object' && obj !== null) {
                const newObj = {};
                for (let key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        const newKey = mapping[key] || key;
                        newObj[newKey] = replaceKeys(obj[key], mapping);
                    }
                }
                return newObj;
            }
            return obj;
        };

        const mappingObj = mapping.reduce((acc, mappingField) => {
            acc[mappingField.old] = mappingField.new;
            return acc;
        }, {});

        return replaceKeys(data, mappingObj);
    }


    filterData(data, filter) {
        return data.filter(item => {
            for (let [field, condition] of Object.entries(filter)) {
                if (!condition(item[field])) {
                    return false;
                }
            }
            return true;
        });
    }

    convertDateFormat(dateString) {
        const [year, month, day] = dateString.split('-');
        return `${day}/${month}/${year}`;
    }

    convertDates(data, dateField) {
        return data.map(item => {
            if (item[dateField]) {
                item[dateField] = this.convertDateFormat(item[dateField]);
            }
            return item;
        });
    }
}

module.exports = new ModifyingService();