import { NextResponse } from 'next/server';
import { connectToDB } from '@utils/database';
import Booking from '@models/Booking';

export async function GET() {
  // Set cache control headers to prevent caching
  const headers = new Headers({
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
    'Surrogate-Control': 'no-store',
  });

  await connectToDB();

  try {
    const tickets = await Booking.aggregate([
      {
        $match: {
          'group.checkedIn': true, // Filter documents where at least one group member is checked in
        },
      },
      {
        $addFields: {
          group: {
            $filter: {
              input: '$group',
              as: 'member',
              cond: { $eq: ['$$member.checkedIn', true] }, // Filter only checked-in group members
            },
          },
        },
      },
    ]);

    return NextResponse.json(tickets, { headers, status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: 'Error finding users' }, { headers, status: 400 });
  }
}
