/**
 * Created by rodrigopavezi on 10/21/14.
 */
(function() {

    "use strict";

    var chai = require("chai");
    var chaiAsPromised = require("chai-as-promised");

    chai.use(chaiAsPromised);
    var expect = chai.expect;

    var fs = require("fs");

    browser.driver.manage().window().setSize(1280, 768);

    describe("Go to Apps", function () {
        var ptor;

        beforeEach(function () {
            ptor = protractor.getInstance();
            browser.get("/web/index.html");
        });

        it("should show apps when /apps is accessed", function () {
            browser.get("/web/index.html#/apps");
            expect(browser.getLocationAbsUrl()).to.eventually.have.string("/apps");
        });

        xit("should show apps when clicked on the apps button on the common header", function () {
            element(by.cssContainingText(".ng-binding", "Apps")).click();
            expect(browser.getLocationAbsUrl()).toMatch("/apps");
        });

        xit("should show a title", function () {
            browser.get("#/apps");
            var expectedTitle = "Rise Vision Apps";
            var title = element(by.id("appsTitle")).getText();
            expect(title).toBe(expectedTitle);
        });

        xit("should show a subtitle", function () {
            browser.get("#/apps");
            var expectedSubTitle = "Create your Rise Vision App using our API";
            var subTitle = element(by.id("appsSubTitle")).getText();
            expect(subTitle).toBe(expectedSubTitle);
        });

        xit("should show a button for developer registration", function () {
            browser.get("#/apps");
            var expectedButtonText = "Register an App"
            var developerRegistrationButton = element(by.id("registerButton"));

            expect(developerRegistrationButton.isPresent()).toBe(true);
            expect(developerRegistrationButton.getText()).toBe(expectedButtonText);
        });

        xit("should show a text explaining that they can build and sell apps on the store after registration", function () {
            browser.get("#/apps");
            var expectedText = "Once you have registered, you can start building an app that you will be able to sell on our Store";
            var registrationText = element(by.id('developerRegistrationText')).getText();

            expect(registrationText).toBe(expectedText);
        });

        xit("should show a title for the getting started links", function () {
            browser.get("#/apps");
            var expectedTitle = "Getting Started";
            var actualTitle = element(by.id("gettingStartedTitle")).getText();

            expect(actualTitle).toBe(expectedTitle);
        });

        xit("should show a link to how to register an app documentation", function () {
            browser.get("#/apps");
            var expectedLinkText = "How to register an Application";
            var actualLinkText = element(by.id("appRegistrationDocumentationLink")).getText();

            expect(actualLinkText).toBe(expectedLinkText);
        });

        xit("should show a link to the Store", function () {
            browser.get("#/apps");
            var expectedLinkText = "Rise Vision Store";
            var actualLinkText = element(by.id("storeLink")).getText();

            expect(actualLinkText).toBe(expectedLinkText);
        });
    });
})();