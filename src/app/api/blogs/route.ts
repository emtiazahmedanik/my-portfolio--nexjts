import { adminDb } from '@/lib/firebase-admin';
import { NextResponse } from 'next/server';
import { IBlogPost } from '@/types/blog';

export async function GET() {
  try {
    const blogsSnapshot = await adminDb.collection('blogs').orderBy('createdAt', 'desc').get();
    
    const blogs: IBlogPost[] = [];
    blogsSnapshot.forEach((doc) => {
      const data = doc.data() as any;
      blogs.push({
        id: doc.id,
        title: data?.title || '',
        content: data?.content || '',
        createdAt: data?.createdAt?.toDate?.() || new Date(),
        updatedAt: data?.updatedAt?.toDate?.() || new Date(),
      });
    });

    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blogs' },
      { status: 500 }
    );
  }
}
