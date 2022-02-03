'use strict';

const { Given, When, Then, setDefaultTimeout } = require('cucumber');
const CareerPage = require('../../po/careerPage.js');
const careerPage = new CareerPage();
setDefaultTimeout(GLOBAL_TIMEOUT);

Given (/the EPAM Career Page is opened/, function (){
    return careerPage.load();
});


When (/the Cookie Policy is accepted/, function (){
    return careerPage.acceptCookie();
});

When (/"(.*)" and "(.*)" is selected in the "Location filter box"/, async function (country, city){
    return await careerPage.selectCityInCountry(country, city);
});

When (/"(.*)" is selected in the "Skills filter box"/, function (skill){
    return careerPage.selectSkill(skill);
});

When (/the "Search button" is clicked/, function (){
    return careerPage.jobSearchButton.click();
});

When (/the "Apply button of the position" is clicked/, function (){
    return careerPage.jobViewAndApplyButton.click();
});


Then (/the "Search form" should be visible/, function (){
    return expect(careerPage.jobSearchFilterForm.isDisplayed()).to.eventually.be.true;
});

Then (/the "Location filter box" should contain "(.*)"/, async function (city){
    return expect(await careerPage.getSelectedCity()).to.equal(city);
});

Then (/the "Skills filter box" should contain "Skills Counter"/, async function (){
    return expect(await careerPage.getSelectedSkill()).to.equal('1');
});

Then (/the "Search form" should contain "(.*)" tag/, async function (skill){
    return expect( await careerPage.getSelectedSkillTag()).to.equal(skill.toUpperCase());
});

Then (/the "Search Result List" should be visible/, function (){
    return expect(careerPage.searchResult.isPresent()).to.eventually.be.true;
});

Then (/the "(.*)" position should be visible/, async function (positionName){
    const positionOfJob = await careerPage.getPositionOfJob();
    return expect(positionOfJob.includes(positionName)).to.be.true;
});

Then (/the "location of the position" should contain "(.*)"/, async function (city){
    const locationOfJob = await careerPage.getLocationOfJob();
    return expect(locationOfJob.includes(city.toUpperCase())).to.be.true;
});

Then (/the "Apply button of the position" should be displayed/, function (){
    return expect(careerPage.jobViewAndApplyButton.isPresent()).to.eventually.be.true;
});

Then (/the "Vacancy description" should be displayed/, function (){
    return expect(careerPage.vacancyDescription.isDisplayed()).to.eventually.be.true;
});

Then (/the "Vacancy description" should contain "(.*)"/,async function (city){
    const locationOfVacancy = await careerPage.getLocationOfVacancy();
    return expect(locationOfVacancy.includes(city.toUpperCase())).to.be.true;
});

Then (/the "Vacancy description" should have "(.*)"/, async function (positionName){
    const positionOfVacancy = await careerPage.getPositionOfVacancy();
    return expect(positionOfVacancy.includes(positionName)).to.be.true;
});
