function formatDate(inputDate) {
    const date = new Date(inputDate);
    const formattedDate = date.toISOString().split("T")[0];
    return formattedDate;
}

export { formatDate };
