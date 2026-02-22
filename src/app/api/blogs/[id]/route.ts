import { adminDb } from '@/lib/firebase-admin';
import { NextResponse } from 'next/server';
import { IBlogPost } from '@/types/blog';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    const docSnapshot = await adminDb.collection('blogs').doc(id).get();
    
    if (!docSnapshot.exists) {
      return NextResponse.json(
        { error: 'Blog not found' },
        { status: 404 }
      );
    }

    const data = docSnapshot.data() as any;
    const blog: IBlogPost = {
      id: docSnapshot.id,
      title: data?.title || '',
      content: data?.content || '',
      createdAt: data?.createdAt?.toDate?.() || new Date(),
      updatedAt: data?.updatedAt?.toDate?.() || new Date(),
    };

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    console.error('Error fetching blog:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog' },
      { status: 500 }
    );
  }
}
