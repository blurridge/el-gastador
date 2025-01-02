import { hc } from 'hono/client';
import { AppType } from '@/app/api/[[...route]]/route';

const honoClient = hc<AppType>(process.env.NEXT_PUBLIC_BASE_URL!);

export default honoClient;
