// import TestSetup from "../utils/TestSetup";
//
// describe("/employee/{id}/document", () => {
//     let HEADERS: any = null;
//     let documents: Array<string> = [];
//     before(async () => {
//         return Promise.all([TestSetup.initTestsuite("admin"), TestSetup.readDocuments()])
//             .then((result) => {
//                 HEADERS = result[0];
//                 return documents = result[1];
//             }).catch((err) => {
//                 console.log(err);
//             })
//
//     });
//
//     it("Should throw an error, non-existent employee", async () => {
//         let response: any;
//         try {
//             response = await chai.request(SERVER)
//                 .get(`${BASE_PATH}/88/document`)
//                 .set(HEADERS);
//         } catch (e) {
//             console.log(e);
//         } finally {
//             expect(response.statusCode).to.be.within(400, 500);
//             expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
//         }
//     });
//
//     it("Should not display anything, no documents added for this employee", async () => {
//         let response: any;
//         try {
//             response = await chai.request(SERVER)
//                 .get(`${BASE_PATH}/2/document`)
//                 .set(HEADERS);
//         } catch (e) {
//             console.log(e);
//         } finally {
//             expect(response.statusCode).to.be.equal(200);
//             expect(response.body.length).to.be.equal(0);
//         }
//     });
//
//     it("Should throw an error, adding a malformed document", async () => {
//         jsf.option({
//             alwaysFakeOptionals: true,
//         });
//         let document = jsf.generate(schema.definitions.IDocument);
//         document.fkEmployee = 888;
//         document.fkDocumentType = 88;
//         document.createdDate = 19;
//         document.dueDate = null;
//         let response: any;
//         try {
//             response = await chai.request(SERVER)
//                 .post(`${BASE_PATH}/3/document`)
//                 .set(HEADERS)
//                 .send();
//         } catch (e) {
//             console.log(e);
//         } finally {
//             expect(response.statusCode).to.be.equal(400);
//             expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
//         }
//     });
//
//     it("Should be able to add a document ", async () => {
//         let response: any;
//         try {
//             // young obiwan
//             let document64 = documents[0];
//
//             let sendDocument = jsf.generate(schema.definitions.IDocument);
//             sendDocument.fkDocumentType = 1;
//             sendDocument.fkEmployee = 3;
//             sendDocument.path = document64;
//
//             response = await chai.request(SERVER)
//                 .post(`${BASE_PATH}/3/document`)
//                 .set(HEADERS)
//                 .send(sendDocument);
//         } catch (e) {
//             console.log(e);
//         } finally {
//             expect(response.statusCode).to.be.equal(200);
//             expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
//
//         }
//     });
//
//     it("Should be able to add a document ", async () => {
//         let response: any;
//         try {
//             // adult obiwan
//             let document64 = documents[1];
//
//             let sendDocument = jsf.generate(schema.definitions.IDocument);
//             sendDocument.fkDocumentType = 1;
//             sendDocument.fkEmployee = 3;
//             sendDocument.path = document64;
//
//             response = await chai.request(SERVER)
//                 .post(`${BASE_PATH}/3/document`)
//                 .set(HEADERS)
//                 .send(sendDocument);
//         } catch (e) {
//             console.log(e);
//         } finally {
//             expect(response.statusCode).to.be.equal(200);
//             expect(response.body).to.be.jsonSchema(schema.definitions.IApiResponse);
//         }
//     });
//
//     it("Should be able to display two documents under an employee ", async () => {
//         let response: any;
//         try {
//             response = await chai.request(SERVER)
//                 .get(`${BASE_PATH}/3/document`)
//                 .set(HEADERS);
//         } catch (e) {
//             console.log(e);
//         } finally {
//             expect(response.statusCode).to.be.equal(200);
//             response.body.forEach((document: any) => {
//                 expect(document).to.be.jsonSchema(schema.definitions.IDocument);
//             });
//             expect(response.body[0].path).to.be.equal(documents[0]);
//             expect(response.body[1].path).to.be.equal(documents[1]);
//         }
//     });
// });
