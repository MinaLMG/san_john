// excelController.js

const xlsx = require("xlsx"); // Step 1
const Person = require("../models/Person");
const Team = require("../models/Team");
const Role = require("../models/Role");
const Education_Year = require("../models/Education_Year");
const Status = require("../models/Status");
module.exports = {
    readExcelController: async (req, res) => {
        const workbook = xlsx.readFile("./src/routers/data.xlsx"); // Step 2
        let workbook_sheet = workbook.SheetNames; // Step 3
        for (let i of workbook_sheet) {
            console.log("i: ", i);
            let names = workbook.Sheets[i];
            console.log("names: ", names);

            let namesModified = xlsx.utils.sheet_to_row_object_array(names);
            console.log("namesModified: ", namesModified);

            for (let row of namesModified) {
                let person = {};
                person.name = row["الاسم"];
                person.ID = row["الرقم القومى "];
                person.gender = "ذكر";
                person.birth_date = new Date(
                    0,
                    0,
                    row["تاريخ الميلاد"] - 1,
                    0,
                    0,
                    0
                );
                t = await Team.find({ name: row["الفرقة"] });
                person.team = t[0] ? t[0]._id : undefined;
                r = await Role.find({ name: row["التخصص"] });
                person.role = r[0] ? r[0]._id : undefined;
                s = await Status.find({ name: row["الحالة"] });
                person.status = s[0] ? s[0]._id : undefined;
                e = await Education_Year.find({ name: row["المرحلة"] });
                person.education_year = e[0] ? e[0]._id : undefined;

                person.father = row["اب الاعتراف"];
                person.bapitization_father = row["اب العماد"];
                person.bapitization_date = row["تاريخ المعمودية"]
                    ? new Date(0, 0, row["تاريخ المعمودية"] - 1, 0, 0, 0)
                    : undefined;
                person.bapitization_church = row["كنيسة المعمودية"];

                person.address = row["العنوان"];

                person.email = row["الايميل (email)"];

                person.facebook = row["الفيسبوك (facebook)"];

                person.father_job = row["عمل الوالد"];
                person.phone_number = row["رقم الموبايل"];
                person.father_phone_number = row["رقم الوالد"];
                person.mother_job = row["ربة منزل"];

                person.mother_phone_number = "";
                person.prep_date_entered = row["تاريخ الالتحاق باعداد خدام"]
                    ? new Date(
                          0,
                          0,
                          row["تاريخ الالتحاق باعداد خدام"] - 1,
                          0,
                          0,
                          0
                      )
                    : undefined;
                person.prep_date_graduated = row["تاريخ التخرج من اعداد خدام"]
                    ? new Date(
                          0,
                          0,
                          row["تاريخ التخرج من اعداد خدام"] - 1,
                          0,
                          0,
                          0
                      )
                    : undefined;
                person.serv_date_entered = row["تاريخ الالتحاق بالخدمة"]
                    ? new Date(0, 0, row["تاريخ الالتحاق بالخدمة"] - 1, 0, 0, 0)
                    : undefined;
                person.serv_date_graduated = row["تاريخ التخرج من الخدمة"]
                    ? new Date(0, 0, row["تاريخ التخرج من الخدمة"] - 1, 0, 0, 0)
                    : undefined;
                // if (!name || !id) {
                //     continue;
                // }
                // console.log("name & ID: ", name, id);
                // const someone = await Person.findOne({ id: id });

                // if (someone) {
                //     console.log(someone, " same ID exists");
                // } else {
                //     const person = new Person({
                //         name: name,
                //         id: id,
                //     });
                //     await person.save();
                // }
                console.log(person);
                const x = new Person(person);
                await x.save();
            }
        }
        res.status(200).send({
            // Step 5
            message: "",
        });
    },
};
