export interface GitHubEvent {
  id: string;
  type: string;
  public: boolean;
  created_at: string;

  actor: {
    id: number;
    login: string;
    display_login: string;
    gravatar_id: string;
    url: string;
    avatar_url: string;
  };

  repo: {
    id: number;
    name: string; // owner/repo
    url: string;
  };

  payload: {
    // PushEvent
    repository_id?: number;
    push_id?: number;
    ref?: string;
    head?: string;
    before?: string;
    size?: number;
    distinct_size?: number;

    // Issues / PR / Watch / Create / Fork / etc.
    action?: string;
    issue?: {
      id: number;
      number: number;
      title: string;
      html_url: string;
    };

    pull_request?: {
      id: number;
      number: number;
      title: string;
      html_url: string;
    };

    ref_type?: "repository" | "branch" | "tag";
    master_branch?: string;
    description?: string | null;

    forkee?: {
      id: number;
      full_name: string;
      html_url: string;
    };

    // fallback for unknown fields
    [key: string]: any;
  };
}
