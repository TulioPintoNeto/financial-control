import { AuthProvider } from '../data/auth/withAuth';
import { Activities } from '../data/getAcitivites';
import { ServerImpl } from '../server';

const server = new ServerImpl();
export const activities = new Activities(server);
export const authProvider = new AuthProvider(server);
