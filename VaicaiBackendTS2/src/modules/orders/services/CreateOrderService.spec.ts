import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import AppError from '@shared/errors/AppError';
import FakeNotificationsRepository from '@modules/notifications/repositories/fakes/FakeNotificationsRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import CreateAppointmentService from './CreateOrderService';

let fakeCacheProvider: FakeCacheProvider;
let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;
let fakeNotificationsRepository: FakeNotificationsRepository;

describe('CreateAppointment', () => {
    beforeEach(() => {
        fakeCacheProvider = new FakeCacheProvider();
        fakeNotificationsRepository = new FakeNotificationsRepository();
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        createAppointment = new CreateAppointmentService(
            fakeAppointmentsRepository,
            fakeNotificationsRepository,
            fakeCacheProvider,
        );
    });

    it('should be able to create a new appointment', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        const appointment = await createAppointment.execute({
            date: new Date(2020, 4, 10, 13),
            user_id: '123456',
            provider_id: `12345678910`,
        });

        expect(appointment).toHaveProperty('id');
        expect(appointment.provider_id).toBe(`12345678910`);
    });

    it('should not be able to create a new appointment at the same time', async () => {
        jest.spyOn(Date, 'now').mockImplementation(() => {
            return new Date(2020, 4, 10, 8).getTime();
        });
        const appointmentsDate = new Date(2020, 4, 11, 11);

        await createAppointment.execute({
            date: appointmentsDate,
            user_id: '123456',
            provider_id: `12345678910`,
        });

        await expect(
            createAppointment.execute({
                date: appointmentsDate,
                user_id: '123456',
                provider_id: `12345678910`,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create an appointment on a past date', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        await expect(
            createAppointment.execute({
                date: new Date(2020, 4, 10, 11),
                user_id: '123456',
                provider_id: `12345678910`,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create an appointment with same user as provider', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 12).getTime();
        });

        await expect(
            createAppointment.execute({
                date: new Date(2020, 4, 10, 13),
                user_id: '123456',
                provider_id: `123456`,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create an appointment before 8 AM or after 5PM', async () => {
        jest.spyOn(Date, 'now').mockImplementationOnce(() => {
            return new Date(2020, 4, 10, 6).getTime();
        });

        await expect(
            createAppointment.execute({
                date: new Date(2020, 4, 11, 7),
                user_id: '123456',
                provider_id: `12345678910`,
            }),
        ).rejects.toBeInstanceOf(AppError);

        await expect(
            createAppointment.execute({
                date: new Date(2020, 4, 11, 18),
                user_id: '123456',
                provider_id: `12345678910`,
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
