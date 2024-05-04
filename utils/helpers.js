module.exports = {
    format_date: (date) => {
      return `${date.toLocaleDateString()} at ${date.toLocaleTimeString()}`;
    },

    userRandomDate: () => {
        const minDate = new Date(2023, 10, 1);
        const maxDate = new Date(2024, 0, 1);
        const randomDate = new Date(minDate.getTime() + Math.random() * (maxDate.getTime() - minDate.getTime()));
        return randomDate;
    },

    blogRandomDate: () => {
        const minDate = new Date(2024, 0, 1);
        const maxDate = new Date(2024, 1, 29);
        const randomDate = new Date(minDate.getTime() + Math.random() * (maxDate.getTime() - minDate.getTime()));
        return randomDate;
    },

    // getRandomDate is used to randomly generate date/timestamps for blog comments for the seed data
    commentRandomDate: () => {
        // I set March 1st as the earliest date possible for a seed comment's date/timestamp
        const minDate = new Date(2024, 2, 1);
        // I set the current date/time (at the time of seeding the database) to be the latest date possible for a seed comment's date/timestamp
        const maxDate = new Date();
        // Math.random() * (maxDate.getTime() - minDate.getTime()) will generate a random number within the range of the two dates, to be added to the minDate for the final result.
        const randomDate = new Date(minDate.getTime() + Math.random() * (maxDate.getTime() - minDate.getTime()));
        return randomDate;
    },

    // getPreview is used to obtain a 3 sentence preview of each blog to be rendered on the homepage. The blog.content is first split into an array of sentences, and then the first 3 sentences are extracted, joined by a period and space, and ended with a final period. 
    getPreview: (string) => {
        let sentencesArray = string.split('.');
        let preview = sentencesArray.slice(0, 3).join('. ') + ' . . .';
        return preview;
    },

    // getParagraph1 and getParagraph2 are used to help render separate paragraphs of blog content as individual paragraphs on the web page. The blog.content is split by the \n character, and each paragraph is returned (separately).

    getParagraph1: (string) => {
        let paragraphsArray = string.split('\n');
        let paragraph1 = paragraphsArray[0];
        return paragraph1;
    },

    getParagraph2: (string) => {
        let paragraphsArray = string.split('\n');
        let paragraph2 = paragraphsArray[1];
        return paragraph2;
    },

    getUserAge: (date_created) => {
        const today = new Date();
        const dateString = date_created;
        const dateToSubtract = new Date(dateString);
        const differenceInMilliseconds = today - dateToSubtract;
        const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
        if (differenceInDays >= 365) {
            const years = Math.floor(differenceInDays / 365);
            const daysRemainder = differenceInDays % 365;
            return `${years} years and ${daysRemainder} days`;
        } else {
            return `${differenceInDays} days`;
        }
    },
}