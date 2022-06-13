export default interface ICreateOrderDTO {
    provider_id: string;
    user_id: string;
    username: string;
    payment: string;
    flavors_id: string[];
    price: string;
}
