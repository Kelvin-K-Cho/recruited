const keywordBank = require('./keywordBank');
const _ = require('lodash');

const cleanString = (string) => {
  // to Clean random characters that are not Alphabets:
  let result = "";
  for (let i = 0; i < string.length; i++) {
    const currentChar = string[i].toLowerCase();
    if (currentChar.charCodeAt() >= "a".charCodeAt() &&  // check if it is a alphabet
      currentChar.charCodeAt() <= "z".charCodeAt()) {
        result += currentChar; // copy it if alphabet
    }
  }
  return result;
};


const getJobKeywords = (stringToken) => {
  // from job tite tokens, we need to look for similar keys in the keywordBank
  const allKeys = Object.keys(keywordBank);
  for (let i = 0; i < allKeys.length; i++) {
    if (allKeys[i].includes(stringToken)) { // if the strinToken appears in a list of keywords
      return keywordBank[allKeys[i]];
    }
  }
};

const getThisJobKeywords = (job) => {
  let thisJobKeywords = [];
  job.title.split(" ").forEach((token) => {
    const cleanedToken = cleanString(token);
    const keywords = getJobKeywords(cleanedToken);
    if (keywords) {
      thisJobKeywords = _.merge(thisJobKeywords, keywords.split(", "));
    }
  });
  // filter unnecessary keywords that dont appear in this JOB QUALIFICATIONS:
  let filteredJobKeywords = [];
  thisJobKeywords.forEach(keyword => {
    if (job.qualifications.includes(keyword)) {
      filteredJobKeywords.push(keyword);
    }
  });
  return filteredJobKeywords;
};

module.exports = (job, resumes) => {
  // call the function to gather all the keywords related to this job title:
  let thisJobKeywords = getThisJobKeywords(job);
  let dupResumes = _.merge([], resumes); // dup, so we can modify

  if (thisJobKeywords.length < 1) { // handle if no keywords, return all 0 percentMatch
    dupResumes.forEach((resume, idx) => {
      dupResumes[idx].percentMatch = 0;
    });
    return dupResumes;
  }
  // check for matched keywords that the recruiters are looking for:
  dupResumes.forEach((resume, idx) => {
    let matchCount = 0;
    thisJobKeywords.forEach((keyword) => {
      if (resume.resumeText.includes(keyword)) matchCount ++;
    });

    dupResumes[idx].percentMatch = matchCount / thisJobKeywords.length;
  });
  return dupResumes;
};
