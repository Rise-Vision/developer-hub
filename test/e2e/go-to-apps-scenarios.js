/**
 * Created by rodrigopavezi on 10/21/14.
 */
(function() {

    "use strict";

    var chai = require("chai");
    var chaiAsPromised = require("chai-as-promised");

    chai.use(chaiAsPromised);
    var expect = chai.expect;
    var assert = chai.assert;

    var fs = require("fs");

    browser.driver.manage().window().setSize(1280, 768);

    describe("Go to Apps", function () {

        beforeEach(function () {
            browser.get("/web/#/apps");
        });

        it("should show apps when /apps is accessed", function () {
            expect(browser.getLocationAbsUrl()).to.eventually.have.string("/apps/list");
        });


        it("should show a title", function () {
            var titleElement = element(by.binding('APPS'));
            expect(titleElement.isPresent()).to.eventually.be.true;
            assert.eventually.equal(titleElement.getText(),"Apps");
        });

        it("should show a Register An App button", function () {
            var buttonElement = element(by.binding('REGISTER_AN_APP'));
            expect(buttonElement.isPresent()).to.eventually.be.true;
            assert.eventually.equal(buttonElement.getText(),"Register An App");
        });



    });
})();