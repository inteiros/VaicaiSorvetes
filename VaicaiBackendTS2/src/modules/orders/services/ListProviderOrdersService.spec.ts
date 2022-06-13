import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderAppointmentsServices from './ListProviderOrdersService';

let fakeCacheProvider: FakeCacheProvider;
let listProviderAppointmentsServices: ListProviderAppointmentsServices;
let fakeAppointmentRepository: FakeAppointmentRepository;

describe('ListProviderAppointments', () => {
    beforeEach(() => {
        fakeCacheProvider = new FakeCacheProvider();
        fakeAppointmentRepository = new FakeAppointmentRepository();

        listProviderAppointmentsServices = new ListProviderAppointmentsServices(
            fakeAppointmentRepository,
            fakeCacheProvider,
        );
    });

    it('should be able to list the appointments on a specific day', async () => {
        const app1 = await fakeAppointmentRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2020, 4, 20, 14, 0, 0),
        });

        const app2 = await fakeAppointmentRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2020, 4, 20, 15, 0, 0),
        });

        const appointments = await listProviderAppointmentsServices.execute({
            provider_id: 'provider',
            year: 2020,
            month: 5,
            day: 20,
        });

        expect(appointments).toEqual([app1, app2]);
    });
});
