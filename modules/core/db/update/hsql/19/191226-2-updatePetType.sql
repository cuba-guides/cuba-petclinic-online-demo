alter table PETCLINIC_PET_TYPE add column COLOR varchar(6) ^
update PETCLINIC_PET_TYPE set COLOR = 'ffffff' where COLOR is null ;
alter table PETCLINIC_PET_TYPE alter column COLOR set not null ;
