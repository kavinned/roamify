function formatDate(inputDate: string) {
    const date = new Date(inputDate);
    const formattedDate = date.toISOString().split("T")[0];
    return formattedDate;
}

export function debounce<T extends unknown[], U>(
    callback: (...args: T) => PromiseLike<U> | U,
    wait: number
) {
    let timer: NodeJS.Timeout;

    return (...args: T): Promise<U> => {
        clearTimeout(timer);
        return new Promise((resolve) => {
            timer = setTimeout(() => resolve(callback(...args)), wait);
        });
    };
}

export { formatDate };
