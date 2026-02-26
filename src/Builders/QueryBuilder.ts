type ComparisonOperator = '=' | '!=' | '>' | '<' | '>=' | '<=';

type WhereCondition = {
    field: string;
    operator: ComparisonOperator;
    value: any;
};

class QueryBuilder {
    private conditions: WhereCondition[] = [];
    private limitValue: number | null = null;
    private skipValue: number | null = null;
    private orderByField: string | null = null;
    private orderDirection: 'asc' | 'desc' = 'asc';

    constructor(private model: any) {
        this.model = model;
    }

    where(field, operatorOrValue: ComparisonOperator | any, value?: any): this {
        let operator: ComparisonOperator = '=';
        let actualValue = value;

        if (value === undefined) {
            actualValue = operatorOrValue;
        } else {
            operator = operatorOrValue as ComparisonOperator;
        }

        this.conditions.push({
            field,
            operator,
            value: actualValue
        });

        return this;
    }

    limit(value: number): this {
        this.limitValue = value;
        return this;
    }

    skip(value: number): this {
        this.skipValue = value;
        return this;
    }

    orderBy(field, direction: 'asc' | 'desc' = 'asc'): this {
        this.orderByField = field;
        this.orderDirection = direction;
        return this;
    }

    async get(): Promise<any> {
        try {
            // @ts-ignore
            const allRecords = await this.model.all();
            return this.applyFilters(allRecords);
        } finally {
            this.reset();
        }
    }

    async first(): Promise<any> {
        const results = await this.limit(1).get();
        return results[0] || null;
    }

    private applyFilters(records) {
        let result = this.applyConditions(records);
        result = this.applyOrdering(result);
        result = this.applyPagination(result);
        return result;
    }

    private applyConditions(records) {
        return records.filter(record => {
            return this.conditions.every(condition => {
                const fieldValue = record[condition.field];
                return this.evaluateCondition(fieldValue, condition.operator, condition.value);
            });
        });
    }

    private evaluateCondition(fieldValue: any, operator: ComparisonOperator, value: any): boolean {
        switch (operator) {
            case '=':
                return fieldValue === value;
            case '!=':
                return fieldValue !== value;
            case '>':
                return fieldValue > value;
            case '<':
                return fieldValue < value;
            case '>=':
                return fieldValue >= value;
            case '<=':
                return fieldValue <= value;
            default:
                return true;
        }
    }

    private applyOrdering(records) {
        if (!this.orderByField) return records;

        return [...records].sort((a, b) => {
            const aValue = a[this.orderByField!];
            const bValue = b[this.orderByField!];

            if (aValue === bValue) return 0;

            const comparison = aValue < bValue ? -1 : 1;
            return this.orderDirection === 'asc' ? comparison : -comparison;
        });
    }

    private applyPagination(records) {
        let result = records;

        if (this.skipValue !== null) {
            result = result.slice(this.skipValue);
        }

        if (this.limitValue !== null) {
            result = result.slice(0, this.limitValue);
        }

        return result;
    }

    private reset(): void {
        this.conditions = [];
        this.limitValue = null;
        this.skipValue = null;
        this.orderByField = null;
        this.orderDirection = 'asc';
    }
}

export default QueryBuilder;