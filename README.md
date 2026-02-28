Blog Platform Database Design
Overview
This project contains the Entity-Relationship Diagram (ERD) and relational mapping for a simple blog platform where users can create blog posts.

ERD Summary
Entities
USER
AttributeNotesidPrimary KeyfirstNamePart of composite name attributemiddleNamePart of composite name attributelastNamePart of composite name attributeDOBDate of BirthageDerived attribute (calculated from DOB)genderemailconfirmEmailphoneMultivalued attributecreatedAtupdatedAt
Blog
AttributeNotesidPrimary KeytitlecontentcreateAtupdatedAt
Relationship

create: A USER can create one or many Blog posts (1 to many relationship).


Relational Mapping
The ERD maps to the following three relational tables:
USERS
ColumnConstraintidPrimary Key (PK)firstNamemiddleNamelastNameDOBgenderemailconfirmEmailcreatedAtupdatedAt

age is a derived attribute and is not stored as a column; it is computed from DOB.

USERS_Phone
Separate table created because phone is a multivalued attribute.
ColumnConstraintphoneuserIdForeign Key referencing USERS(id)
Blog
ColumnConstraintidPrimary Key (PK)titlecontentcreateAtupdatedAtauthorIdForeign Key referencing USERS(id)

Diagrams
ERD
<img width="968" height="709" alt="ERD" src="https://github.com/user-attachments/assets/4c016292-c87b-4c34-99ba-9f05a3fe11fd" />
Relational Mapping
<img width="752" height="704" alt="Mapping" src="https://github.com/user-attachments/assets/7ed73f27-0270-46a3-a6e8-d0cf4ec098c9" />
Design Notes

The phone attribute is multivalued, so it is extracted into its own table USERS_Phone linked back to USERS via a foreign key.
The name attribute is composite, so it is broken down into firstName, middleName, and lastName as individual columns.
The age attribute is derived and should be calculated at the application or query level from DOB rather than stored.
The 1-to-many relationship between USERS and Blog is represented by the authorId foreign key in the Blog table.
