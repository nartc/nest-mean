export function GetOperationId(model: string, operation: string) {
    const _model = ToTitleCase(model).replace(/\s/g, '');
    const _opereration = ToTitleCase(operation).replace(/\s/g, '');

    return {
        title: '',
        operationId: `${_model}_${_opereration}`,
    };
}

function ToTitleCase(str: string): string {
    return str
        .toLowerCase()
        .split(' ')
        .map(word => {
            return word.replace(word[0], word[0].toUpperCase());
        })
        .join(' ');
}
