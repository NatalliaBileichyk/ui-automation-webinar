'use strict'

const { element, browser, protractor } = require("protractor");
var ec = protractor.ExpectedConditions;

class CareerPage {
    constructor(){
        this.logo = element (by.css('.header__logo-container'));
        this.cookieAccept = element (by.css('.cookie-disclaimer__button'));

        this.jobSearchFilterForm = element(by.css('.recruiting-search__form'));
        this.jobSearchButton = element(by.css('.recruiting-search__submit'))
        
        this.locationSelection = this.jobSearchFilterForm.element (by.css('.select2-selection'));
        this.locationFilter = element(by.css('.select2-results > .select2-results__options.open'));
        this.countryOfLocation = country => element(by.css(`li[aria-label="${country}"] strong`));
        this.cityOfLocation = city => element(by.css(`[id*="${city}"]`));
        this.selectedLocation = this.jobSearchFilterForm.element (by.css('.select2-selection__rendered'));

        this.skillsSelection = this.jobSearchFilterForm.element (by.css('.job-search__departments'));
        this.skillsFilter = element(by.css('.multi-select-dropdown'));
        this.getSkillsCheckbox = skill => this.skillsFilter.element (by.css(`[data-value="${skill}"] ~ span`));
        this.skillsCounter = this.skillsSelection.element (by.css('.counter'));
        this.selectedSkillTag = element (by.css('.selected-items'))

        this.searchResult = element (by.css('.search-result__list'));
        this.jobLocation = element (by.css('.search-result__location'));
        this.jobPosition = element (by.css('.search-result__item-name'))
        this.jobViewAndApplyButton = element (by.css('.search-result__item-apply'));

        this.vacancyDescription = element (by.css('.section__content'));
        this.vacancyLocation = element (by.css('.form-component__location'));
        this.vacancyPosition = element (by.css('header h1'));
    }

    load(){
        browser.get('https://www.epam.com/careers');
        return browser.wait(ec.elementToBeClickable(this.logo), GLOBAL_TIMEOUT);
    };

    async acceptCookie(){
        return await browser.isElementPresent(this.cookieAccept)
        .then(isPresent => {
            if (isPresent) {
                this.cookieAccept.click();
            }
        });
    };

    async selectCityInCountry (country, city) {
        this.locationSelection.click();
        browser.sleep(1000);
        browser.wait(ec.visibilityOf(this.locationFilter), GLOBAL_TIMEOUT);
        
        const countryClasses = await this.countryOfLocation(country).getAttribute('class');
        const splittedClasses = countryClasses.split(' ');
        if (splittedClasses.indexOf('dropdown-cities') === -1) {
            browser.actions().mouseMove(this.countryOfLocation(country)).click().perform();
        }

        browser.wait(ec.elementToBeClickable(this.cityOfLocation(city)),GLOBAL_TIMEOUT);
        return this.cityOfLocation(city).click();
    };
    
    async getSelectedCity() {
        return await this.selectedLocation.getText();
    };

    async selectSkill(skill) {
        this.skillsSelection.click();
        browser.wait(ec.visibilityOf(this.skillsFilter), GLOBAL_TIMEOUT);
        return await this.getSkillsCheckbox(skill).click();
    }

    async getSelectedSkill() {
        return await this.skillsCounter.getText();
    }

    async getSelectedSkillTag() {
        return await this.selectedSkillTag.getText();
    } 

    async submitSearch(country, city, skill) {
        await this.selectCityInCountry(country, city);
        this.selectSkill(skill);
        return this.jobSearchButton.click();
    }

    async getLocationOfJob() {
        browser.wait(ec.visibilityOf(this.searchResult), GLOBAL_TIMEOUT);
        return await this.jobLocation.getText();
    }

    async getPositionOfJob() {
        browser.wait(ec.visibilityOf(this.searchResult), GLOBAL_TIMEOUT);
        return await this.jobPosition.getText();
    }

    async openVacancyDescription (country, city, skill) {
        await this.submitSearch (country, city, skill)
        browser.wait(ec.visibilityOf(this.jobViewAndApplyButton), GLOBAL_TIMEOUT);
        return this.jobViewAndApplyButton.click();
    }

    async getLocationOfVacancy() {
        return await this.vacancyLocation.getText();
    }

    async getPositionOfVacancy() {
        return await this.vacancyPosition.getText();
    }
}

module.exports = CareerPage;