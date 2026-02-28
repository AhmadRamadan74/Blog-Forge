# Blog Platform Database Design

## Overview

This project contains the Entity-Relationship Diagram (ERD) and relational mapping for a simple blog platform where users can create blog posts.

---

## ERD Summary

### Entities

**USER**
| Attribute | Notes |
|---|---|
| id | Primary Key |
| firstName | Part of composite `name` attribute |
| middleName | Part of composite `name` attribute |
| lastName | Part of composite `name` attribute |
| DOB | Date of Birth |
| age | Derived attribute (calculated from DOB) |
| gender | |
| email | |
| confirmEmail | |
| phone | Multivalued attribute |
| createdAt | |
| updatedAt | |

**Blog**
| Attribute | Notes |
|---|---|
| id | Primary Key |
| title | |
| content | |
| createAt | |
| updatedAt | |

### Relationship

- **create**: A `USER` can create one or many `Blog` posts (1 to many relationship).

---

## Relational Mapping

The ERD maps to the following three relational tables:

### USERS
| Column | Constraint |
|---|---|
| id | Primary Key (PK) |
| firstName | |
| middleName | |
| lastName | |
| DOB | |
| gender | |
| email | |
| confirmEmail | |
| createdAt | |
| updatedAt | |

> `age` is a derived attribute and is not stored as a column; it is computed from `DOB`.

### USERS_Phone
Separate table created because `phone` is a multivalued attribute.

| Column | Constraint |
|---|---|
| phone | |
| userId | Foreign Key referencing `USERS(id)` |

### Blog
| Column | Constraint |
|---|---|
| id | Primary Key (PK) |
| title | |
| content | |
| createAt | |
| updatedAt | |
| authorId | Foreign Key referencing `USERS(id)` |

---

## Diagrams

### ERD
![ERD](ERD.png)

### Relational Mapping
![Mapping](Mapping.png)

---

## Design Notes

- The `phone` attribute is multivalued, so it is extracted into its own table `USERS_Phone` linked back to `USERS` via a foreign key.
- The `name` attribute is composite, so it is broken down into `firstName`, `middleName`, and `lastName` as individual columns.
- The `age` attribute is derived and should be calculated at the application or query level from `DOB` rather than stored.
- The 1-to-many relationship between `USERS` and `Blog` is represented by the `authorId` foreign key in the `Blog` table.
