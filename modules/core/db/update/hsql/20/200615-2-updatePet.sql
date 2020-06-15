alter table PETCLINIC_PET add column GENERATION integer ^
update PETCLINIC_PET set GENERATION = 10 where GENERATION is null ;
alter table PETCLINIC_PET alter column GENERATION set not null ;
