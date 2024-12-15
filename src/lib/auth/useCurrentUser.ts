import { useEffect, useState } from 'react';
import { supabase } from '@/lib/db';

export function useCurrentUser() {
  const [user, setUser] = useState<{
    id: string;
    email: string;
    referral_id: string;
  } | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        console.error('Error fetching user:', error);
        setUser(null);
        return;
      }

      if (data.user) {
        const { id, email } = data.user;

        // Ensure email is a string or default to an empty string
        const safeEmail = email ?? '';

        // Fetch additional user info from the users table
        const { data: userProfile, error: profileError } = await supabase
          .from('users')
          .select('referral_id')
          .eq('user_id', id)
          .single();

        if (profileError) {
          console.error('Error fetching user profile:', profileError);
          setUser(null);
        } else {
          setUser({
            id,
            email: safeEmail, 
            referral_id: userProfile?.referral_id ?? '', // Ensure referral_id is a string
          });
        }
      }
    };

    fetchUser();
  }, []);

  return user;
}
