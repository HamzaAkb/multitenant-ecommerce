import payload from 'payload';
import config from './payload.config';

const migrate = async () => {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET || '',
    config,
  });

  await payload.db.destroy();
  await payload.db.init();

  process.exit(0);
};

migrate().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});