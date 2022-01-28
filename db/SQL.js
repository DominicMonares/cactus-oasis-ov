/*

decide between Postgres, MySQL, or MariaDB

========== OUR NEEDS ==========

PRODUCT DATA
- product is one to one
- category is one to many

STYLE DATA
- product id is one to many

REVIEW DATA
- product id is one to many
- reviews are unique

CART DATA
- appears to be based on user instance, would need to be cleared before or after page refresh/load


========== RESEARCH ==========

Postgres: - WINNER
- highly extensible (create own datatypes, custom functions, etc.)
- streaming API for large objects
- partitioning by range, list, and hash
- no multi-source replication
- accepts array data type

Choosing a SQL db because there

MySQL:
- server side scripts
- horizontal partitioning, sharding
- only uses SQL standard type data types

MariaDB:
- server side scripts
- horizontal partitioning and sharding

*/


