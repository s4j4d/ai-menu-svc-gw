export default interface Message {
    level: string; // error, warning
    domain: string; // com-chargoon-cloud-svc-organizations
    module: string; //  positions
    context: string; // name of the action
    exception: string; // DuplicateId
    message: string;
  }