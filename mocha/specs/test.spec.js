'use strict'

const CareerPage = require('../../po/careerPage.js');
const careerPage = new CareerPage();
const data = require('../data.json')

data.forEach( data => {
    describe(`Search for a job of ${data.PositionName} in ${data.City} (${data.Country})`, function () {
        this.timeout(GLOBAL_TIMEOUT);

        beforeEach(() => {
            careerPage.load();
            return careerPage.acceptCookie()
        });

        describe("Career Page", () => {
            it ("the Career Page should be opened", () => {
                return expect(careerPage.logo.isDisplayed()).to.eventually.be.true;
            });
        });

        describe("Search form", () => {
            it("should be displayed", () => {
                return expect(careerPage.jobSearchFilterForm.isDisplayed()).to.eventually.be.true;
            });

            describe("\"Location\" filter box", () => {
                beforeEach(async () => {
                   await careerPage.selectCityInCountry(data.Country, data.City);
                });

                it("should filter to a specific location", async() => {
                    return expect(await careerPage.getSelectedCity()).to.equal(data.City);
                });
            });

            describe("\"Skills\" filter box", () => {
                beforeEach(() => {
                    careerPage.selectSkill(data.Skills);
                });

                it("should filter to a specific skill", async () => {
                    return expect( await careerPage.getSelectedSkill()).to.equal('1');
                });
                
                it("should add specific skill filter tag", async () => {
                    return expect( await careerPage.getSelectedSkillTag()).to.equal(data.Skills.toUpperCase());
                });
            });

            describe("Searching", () => {
                beforeEach(async () => {
                   await careerPage.submitSearch(data.Country, data.City, data.Skills);                    
                });

                it("should display search result list", () => {
                    return expect(careerPage.searchResult.isPresent()).to.eventually.be.true;
                });

                it("should display job with proper location", async() => {
                    const locationOfJob = await careerPage.getLocationOfJob();
                    return expect(locationOfJob.includes(data.City.toUpperCase())).to.be.true;
                });

                it("should have job with required skill", async () => {
                    const positionOfJob = await careerPage.getPositionOfJob();
                    return expect(positionOfJob.includes(data.PositionName)).to.be.true;
                });

                it("should have \"View and Apply\" button for a job", () => {
                    return expect(careerPage.jobViewAndApplyButton.isPresent()).to.eventually.be.true;
                });
                
            });

            describe("Vacancy description", () => {
                beforeEach(async () => {
                    await careerPage.openVacancyDescription(data.Country, data.City, data.Skills)
                });
        
                it("should display Vacancy description", () => {
                    return expect(careerPage.vacancyDescription.isDisplayed()).to.eventually.be.true;
                });
        
                it("should contain proper location", async() => {
                    const locationOfVacancy = await careerPage.getLocationOfVacancy();
                    return expect(locationOfVacancy.includes(data.City.toUpperCase())).to.be.true;
                });
        
                it("should contain required position", async () => {
                    const positionOfVacancy = await careerPage.getPositionOfVacancy();
                    return expect(positionOfVacancy.includes(data.PositionName)).to.be.true;
                });        
            });
        });
    });

    
});