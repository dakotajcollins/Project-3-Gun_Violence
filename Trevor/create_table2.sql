-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.


CREATE TABLE "Mass_Shootings" (
    "incident_id" varchar   NOT NULL,
    "incident_date" varchar   NOT NULL,
    "state" varchar   NOT NULL,
    "city_county" varchar   NOT NULL,
    "street_address" varchar   NOT NULL,
    "killed" int   NOT NULL,
    "injured" int   NOT NULL,
    "full_address" varchar   NOT NULL,
    "lat" float   NOT NULL,
    "long" float   NOT NULL
);

