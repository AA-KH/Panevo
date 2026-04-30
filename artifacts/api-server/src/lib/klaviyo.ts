import { logger } from "./logger";

export async function addToList(email: string, listId: string, properties?: Record<string, any>) {
  const apiKey = process.env.KLAVIYO_API_KEY;
  if (!apiKey) {
    logger.warn("KLAVIYO_API_KEY not set. addToList skipped.");
    return { skipped: true };
  }

  try {
    const response = await fetch("https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/", {
      method: "POST",
      headers: {
        "Authorization": `Klaviyo-API-Key ${apiKey}`,
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Revision": "2024-10-15"
      },
      body: JSON.stringify({
        data: {
          type: "profile-subscription-bulk-create-job",
          attributes: {
            profiles: {
              data: [
                {
                  type: "profile",
                  attributes: {
                    email: email,
                    properties: properties
                  }
                }
              ]
            },
            relationships: {
              list: {
                data: {
                  type: "list",
                  id: listId
                }
              }
            }
          }
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      logger.error({ errorData }, "Klaviyo addToList failed");
      return { ok: false, error: errorData };
    }

    return { ok: true };
  } catch (err) {
    logger.error({ err }, "Klaviyo addToList exception");
    return { ok: false, error: err };
  }
}

export async function trackEvent(email: string, eventName: string, properties?: Record<string, any>) {
  const apiKey = process.env.KLAVIYO_API_KEY;
  if (!apiKey) {
    logger.warn("KLAVIYO_API_KEY not set. trackEvent skipped.");
    return { skipped: true };
  }

  try {
    const response = await fetch("https://a.klaviyo.com/api/events/", {
      method: "POST",
      headers: {
        "Authorization": `Klaviyo-API-Key ${apiKey}`,
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Revision": "2024-10-15"
      },
      body: JSON.stringify({
        data: {
          type: "event",
          attributes: {
            properties: properties,
            metric: {
              data: {
                type: "metric",
                attributes: {
                  name: eventName
                }
              }
            },
            profile: {
              data: {
                type: "profile",
                attributes: {
                  email: email
                }
              }
            }
          }
        }
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      logger.error({ errorData }, "Klaviyo trackEvent failed");
      return { ok: false, error: errorData };
    }

    return { ok: true };
  } catch (err) {
    logger.error({ err }, "Klaviyo trackEvent exception");
    return { ok: false, error: err };
  }
}
