import { CubaApp, FetchOptions } from "@cuba-platform/rest";

export var restServices = {
  petclinic_VisitTestDataCreationService: {
    createVisits: (cubaApp: CubaApp, fetchOpts?: FetchOptions) => () => {
      return cubaApp.invokeService(
        "petclinic_VisitTestDataCreationService",
        "createVisits",
        {},
        fetchOpts
      );
    },
    necessaryToCreateVisitTestData: (
      cubaApp: CubaApp,
      fetchOpts?: FetchOptions
    ) => () => {
      return cubaApp.invokeService(
        "petclinic_VisitTestDataCreationService",
        "necessaryToCreateVisitTestData",
        {},
        fetchOpts
      );
    }
  }
};
