export const parseDate = (date : Date) => {
            const ageInDays = (Date.now() - date.getTime()) / (1000 * 60 * 60 * 24);
            let formated_date;
            if (ageInDays < 1) {
                formated_date = "Today";
            } else {
                formated_date = `${
                    Math.floor(ageInDays)
                } days ago`;
            };
            return formated_date;
}